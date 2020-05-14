import {map} from './map';
import axios from 'axios';

export function showVisual(){
	axios.post("/api/showVisual", 
		{}
	).then(res => {
		console.log(res.data);
			if(res.data){
				if(res.data.message===true){
					var D = res.data.data;
					var sta = {}
					map.forEach(elements=>{
						//(elements[0]==="userimage") && (elements
						var arr = elements[1].split('.')
						var val = D;
						var i;
						for(i=0;i<arr.length;i++){
							val = val[arr[i]];
							if(val===undefined){
								val=(elements.length<=2)?'':elements[2]
								break
							}
						}
						sta[elements[0]]=val;
					})
					sta.InitWorkNum = res.data.data.Occupation.length;
					sta.imagePreviewUrl = sta.userimage;
					console.log('sta=',sta)
					this.setState(sta);
					res.data.data.Occupation.forEach((item,index)=>{
						this.setState({
							[`work_O_${index+1}`] : (item.O===undefined)?'':item.O,
							[`work_P_${index+1}`] : (item.P===undefined)?'':item.P,
							[`work_C_${index+1}`] : (item.C===undefined)?'':item.C,
							[`work_show_${index+1}`] : item.show
						},function(){
							this.addOccupation(true)
						});
					})
				}else{
					alert('錯誤：\n'+res.data.description);
				}
			}
	})
};

export function handleSubmit(event){
	event.preventDefault();
	console.log(this.state);
	if(false){
		alert("一些判斷式") //validation
	}else{
		var r = window.confirm("確認更改?");
		if (r){
			var sta= new FormData();
			map.forEach(elements=>{
				if(this.state.hasChanged[elements[0]] && this.state[elements[0]]!==undefined){
					sta.append(elements[1],this.state[elements[0]])
				}
				//sta[elements[1]]=this.state[elements[0]]//資料形式從{}改成FormData
			})
			var toModify = {}
			var toRemove = {}
			var toInsert = {}
			for(var workL = 1;workL<=this.state.InitWorkNum;workL++){
				console.log('workL0',workL)
				if(this.state.hasChanged[`work_${workL}`]===true){
					toRemove[`work_${workL}`] = 1
				}else{
					(['O','P','C']).forEach(word=>{
						if(this.state.hasChanged[`work_${word}_${workL}`]){
							toModify[`work_${word}_${workL}`] = this.state[`work_${word}_${workL}`]
						}
					})
				}
			}
			if(Object.entries(toModify).length!==0) sta.append('Occupation.Modify',JSON.stringify(toModify))
			if(Object.entries(toRemove).length!==0)  sta.append('Occupation.Remove',JSON.stringify(toRemove))
			for(var workL = this.state.InitWorkNum+1;workL<=this.state.Occupation_number;workL++){
				console.log('workL',workL);
				(['O','P','C']).forEach(word=>{
					console.log('word',word)
					if(this.state.hasChanged[`work_${word}_${workL}`]){
						toInsert[`work_${word}_${workL}`] = this.state[`work_${word}_${workL}`]
					}
				})
			}
			console.log('insert',toInsert)
			if(Object.entries(toInsert).length!==0)  sta.append('Occupation.Insert',JSON.stringify(toInsert))
			console.log('sta',sta)
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			};
			axios.post("/api/chVisual"
			,
			sta
			/*{
			"username.show": this.state.realname_checkbox,
			"username.data": this.state.realname,
			"nickname.data" : this.state.,
			"profile.data" : this.state.shortintro,

			education:[
				{
					SD : this.Profile_diploma_bachelor_major,
					Note : "",
				}
			],
			publicEmail : this.Profile_email,
			office : this.Profile_phone_company,
			cellphone : this.Profile_mobile,
			CC : this.Profile_address,
			Occupation:[
				"",
				""
			],
			JobID:this.state.JobID
			}*/,
			config
			).then(res => {

				console.log(res.data);
					if (res.data){
						if (res.data.message === true){ 
							alert("修改成功!");
								var hasChanged = {...this.state.hasChanged}
								map.forEach(element=>{
									hasChanged[element[0]] = false;
								})
								this.setState({hasChanged});
							//window.location = ? in's router hasn't done yet
						}else{
							alert("錯誤: \n"+res.data.description);
						}

					}
			})
		}
	}
}