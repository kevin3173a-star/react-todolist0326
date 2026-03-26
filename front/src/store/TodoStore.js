import { create } from 'zustand'
import axios from 'axios'

const todoStore = create((set) => ({
    data:[],
    save:async (value) => 
    //**예외처리 
      {try{
       let res = await axios.post(process.env.REACT_APP_APIURL,value)//저장
       console.log(res)
       set((item)=>({data:[...item.data,res.data.data]}));
       //기존 데이터(...item.data), 새로운값(res.data.data)추가

        if(!res.data.success){//응답을 못한 false일때
            throw new Error(res.data.msg)//에러발생시켜서 catch로 넘어가게
        }
    }
    catch(err){
        console.log(`에러발생 - ${err}`)
    };
    },
    get: async () => 
      {const res = await axios.get(process.env.REACT_APP_APIURL);
        set({data:res.data});
      },
    del: async(id) =>
      {try{
        const res = await axios.delete(`${process.env.REACT_APP_APIURL}?id=${id}`);
        if(!res.data.success){
            throw new Error('에러발생')
        }
        set((item)=>(
            {data:item.data.filter(obj=>obj._id != id)}
        ));
       }
       catch(err){
        console.log(`에러발생 - ${err}`)
        }
       
    },
    //수정(완료상태)
    completeTodo: async(id)=>{
        await axios.put(`${process.env.REACT_APP_APIURL}/state?id=${id}`,{isdone:true});
        set((item)=>{
            let updateData=item.data.map((obj)=>{
                if(obj._id==id){
                    obj.isdone=true;
                }
                return obj;
            });
            return {data:updateData}
        })
    },

    //수정(값 수정)
    update: async (id,editText,setEditId)=>{
        try{
            const res = await axios.put(`${process.env.REACT_APP_APIURL}/state?id=${id}`,{content:editText});//기존 value값을 수정한 value값으로
            if(!res.data.success){
                throw new Error('에러발생')
            }
            set(item=>{
                let updateData= item.data.map(obj=>{
                    if(obj._id==id){
                        obj.content=editText;
                    }
                    return obj;
                });
                setEditId(null);//id값 초기화(안해주면 id가 계속 남아 3중연산자에서 수정 후에 수정된 할일이 출력 안되고 입력창 출력이 계속 실행됨)
    
                return{data:updateData}//기존 데이터를 수정된 updateData로 변경
            })
        }
        catch(err){
            console.log(err);
        }
    },

    //분류
    sort:async (value)=>{
        const res= await axios.get(`${process.env.REACT_APP_APIURL}/completed?sort=${value}`);
        set({data:res.data});
    } 
}))

export default todoStore;