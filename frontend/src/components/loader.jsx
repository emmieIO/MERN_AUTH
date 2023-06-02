import { Spinner } from "react-bootstrap";  

const Loader = ()=>{
    return(
        <Spinner
        animation="border"
        role="status"
        style={{
            width:"20px",
            height:"20px",
            margin:"auto",
            
    }} />
    )
}

export default Loader