import { useState } from "react";
import { Row,Col, Image, Button, Card } from "react-bootstrap";
import { useNavigate  } from "react-router-dom";

const duracion=[1,1,3,1,2]
const proced = ["Control","Vacuna","Cirugía","Control","Baño"]
function Crear(){
    const navigate = useNavigate()
    const [reserva, setReserva] =useState([])
    const crearCita = async()=>{
        const correo = document.getElementById("idCorreo");
        const fecha = document.getElementById("idFecha");
        console.log(String(fecha.value))
        const nombre = document.getElementById("idNombre");
        const procedimiento = document.getElementById("idProcedimiento");
        const tipo = document.getElementById("idTipo");
        console.log(procedimiento)
        const response = await fetch("http://localhost:4000/reserva",{method:"POST",headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },body:JSON.stringify({
            correo:correo.value,
            fecha:fecha.value,
            nombreMascota:nombre.value,
            procedimiento:proced[procedimiento.value],
            duracion:duracion[procedimiento.value],
            estado:"Por Confirmar",
            tipo:tipo.value
        })})
        if(response.ok){
            response.json().then((data)=>setReserva([data.id,data.correo]))
        }
        else{
            response.json().then((data)=>{alert(data.message)})
        }
    }
    return (
        <div style={{paddingLeft:"50px",paddingRight:"50px"}}>
            <Row>
            <div style={{width:100}}>
                <div class="float-start" style={{padding:"25px"}} >
                    <Button style={{position:"left"}} onClick={()=>navigate("/")}>Volver</Button>
                </div>
            </div></Row>
            <Row >
                
                <Col  style={{"background-color":"white","aling-items-center":"true"}}>
                    <Row>
                        <span style={{"color":"beige"}}>___________</span>
                        <h3>
                            Agendar cita:
                        </h3>
                    </Row>
                    <Row>
                        <Col ><p>Correo</p></Col>
                        <Col><input id="idCorreo" style={{width:"220px"}}></input></Col>
                    </Row>
                    <Row>
                        <Col><p>Fecha</p></Col>
                        <Col><input id="idFecha" type="datetime-local" style={{width:"220px"}}></input></Col>
                    </Row>
                    <Row>
                        <Col><p>Nombre de la mascota</p></Col>
                        <Col><input id="idNombre" style={{width:"220px"}}></input></Col>
                    </Row>
                    <Row>
                        <Col><p>Procedimiento</p></Col>
                        <Col>
                            <select id="idProcedimiento" style={{width:"220px"}}>
                                <option value={0}>Control</option>
                                <option value={1}>Vacuna</option>
                                <option value={2}>Cirugía</option>
                                <option value={3}>Control</option>
                                <option value={4}>Baño</option>
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col><p>Tipo de mascota</p></Col>
                        <Col>
                            <select id="idTipo" style={{width:"220px"}}>
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </Col>
                    </Row>
                    <Button onClick={crearCita} style={{width:"220px",marginBottom:"15px"}}>Ingresar</Button>
                </Col>
                
                {reserva.length>0?
                <Col style={{"background-color":"olivedrab",color:"white",margin:"10px"}}>
                    <Row>
                        <h2 style={{padding:50}}>
                            Se registró su cita existosamente!
                        </h2>
                        <h2 >
                            Código de reserva <b>{reserva[0]}</b>
                        </h2>
                    </Row>
                </Col>:
                <Col>

                </Col>}
                
            </Row>
            
        </div>
    )
}export default Crear;