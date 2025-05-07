'use client';
import { useData } from "../_component/DataProvider";
import Link from "next/link";

const Show=()=>{
    const{state,dispatch}=useData();


    const handleDel=(ind:number)=>{
        dispatch({type:'del',payload:ind});
    }

    if(state.students.length===0)
    {
        return <h3>There is no data.</h3>;
    }
    return(
        <>
            <h2>Show</h2>
            {
                state.students.map((stu,i)=>{return(
                    <div key={i} className="box">
                        <h3>{stu.name}</h3>
                        <p>
                            {stu.age} <br />
                            {stu.email}
                        </p>
                        <p>
                            <input type="button" value="X" onClick={()=>handleDel(i)} />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Link href={"/edit/"+i}>edit</Link>
                        </p>
                    </div>
                )})
            }
        </>
    );
}
export default Show;