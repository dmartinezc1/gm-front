import { Row,Col, Image, Button, Card } from "react-bootstrap";
import { useNavigate  } from "react-router-dom";
function Login(props){
    const navigate = useNavigate();
    const login = async ()=>  {
        const user = document.getElementById("idUser")
        const pass = document.getElementById("idPassw")
        
        const response = await fetch("http://localhost:4000/login",{method:"POST",headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },body:JSON.stringify({
            user:user.value,
            password:pass.value
        })})

        if(response.ok){
            props.setUser("Admin");
            navigate("/"); 
            
        }
        else{
            response.json().then((data)=>{alert(data.message)})
        }
    }
    return (
        <div style={{padding:"50px",}}>
            <Row >
                <Col style={{"background-color":"white","color":"white"}}>
                    <Image src="data:image/jpeg;base64,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"></Image>
                </Col>
                <Col  style={{"background-color":"white","aling-items-center":"true"}}>
                    <Row>
                        <span style={{"color":"beige"}}>___________</span>
                        <h3>
                            Login:
                        </h3>
                    </Row>
                    <Row>
                        <Col ><p>Correo</p></Col>
                        <Col><input id="idUser"></input></Col>
                    </Row>

                    <Row>
                        <Col><p>Contraseña</p></Col>
                        <Col><input id="idPassw" type="password"></input></Col>
                    </Row>
                    <Button onClick={login}>Ingresar</Button>
                </Col>
            </Row>
            
        </div>
    )
}export default Login;