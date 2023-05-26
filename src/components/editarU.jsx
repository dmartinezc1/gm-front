import { useEffect, useState } from "react";
import { Row,Col,  Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function EditarPublico(){
    const navigate = useNavigate()
    const [reserva,setReserva]=useState([])
    const [valid,setValid]=useState(false)

    const validar = async()=>{
        const idReserva = document.getElementById("idReserva").value;
        const idCorreo = document.getElementById("idUser").value;
        const response =await fetch("http://localhost:4000/reserva/"+idReserva+"/"+idCorreo)
        if(response.ok){
            response.json().then((data)=>setReserva(data))
            setValid(true)
        }
        else{
            setValid(false)
            response.json().then((data)=>{alert("Correo o código incorrecto!")})
            
        }
    }
    const update = async()=>{
        const fecha = document.getElementById("idFecha");
        const estado = document.getElementById("idEstado");
        let estadoV= estado.value;
        if(fecha.value!==reserva.fecha){
            estadoV="Por Confirmar"
        }
        const response = await fetch("http://localhost:4000/reserva/"+reserva.id,{method:"PUT",headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },body:JSON.stringify({
            correo:reserva.correo,
            fecha:fecha.value,
            nombreMascota:reserva.nombreMascota,
            procedimiento:reserva.procedimiento,
            duracion:reserva.duracion,
            estado:estadoV,
            tipo:reserva.tipo
        })})
        alert("Se actualizo la reserva!")
        setReserva([])
        setValid(false)
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
                            Ingrese el código de reserva y su correo:
                        </h3>
                    </Row>
                    <Row>
                        <Col ><p>Correo</p></Col>
                        <Col><input id="idUser"></input></Col>
                    </Row>

                    <Row>
                        <Col><p>Codigo de reserva</p></Col>
                        <Col><input id="idReserva" ></input></Col>
                    </Row>
                    <Button onClick={validar} style={{marginBottom:"15px"}}>Editar</Button>
                </Col>
                {console.log(reserva)}
                {valid?<Col  style={{"background-color":"white","aling-items-center":"true"}}>
                    <Row>
                        <span style={{"color":"beige"}}>___________</span>
                        <h3>
                            Editar cita:
                        </h3>
                    </Row>
                    <Row>
                        <Col><p>Correo</p></Col>
                        <Col><p style={{width:"220px"}}>{reserva.correo}</p></Col>
                    </Row>
                    <Row>
                        <Col><p>Fecha</p></Col>
                        <Col><input id="idFecha" type="datetime-local" defaultValue={reserva.fecha} style={{width:"220px"}}></input></Col>
                    </Row>
                    <Row>
                        <Col><p>Nombre de la mascota</p></Col>
                        <Col><p style={{width:"220px"}}>{reserva.nombreMascota}</p></Col>
                    </Row>
                    <Row>
                        <Col><p>Procedimiento</p></Col>
                        <Col>
                            <p style={{width:"220px"}}>{reserva.procedimiento}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col><p>Tipo de mascota</p></Col>
                        <Col>
                            <p style={{width:"220px"}}>
                                {reserva.tipo}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col><p>Estado</p></Col>
                        <Col>
                            <select id="idEstado" style={{width:"220px"}} defaultValue={reserva.estado} >
                                <option value={reserva.estado}>{reserva.estado}</option>
                                <option value={"Cancelada"}>Cancelada</option>
                                                               
                            </select>
                        </Col>
                    </Row>
                    <Button onClick={update}>Ingresar</Button>
                </Col>:<Col></Col>}
            </Row>
            
        </div>
    )
}export default EditarPublico;