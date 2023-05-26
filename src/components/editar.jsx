import { useEffect, useState } from "react";
import { Row,Col, Image, Button, Card } from "react-bootstrap";
import { useNavigate  } from "react-router-dom";

function Editar(props){
    const [reserva,setReserva]=useState([])
    useEffect(()=>{
        fetch("http://localhost:4000/reserva/"+props.idReserva+"/"+props.correo).then((data)=>data.json()).then((data)=>setReserva(data))
    },[props])

    const update = async()=>{
        const fecha = document.getElementById("idFecha");
        const estado = document.getElementById("idEstado");

        const response = await fetch("http://localhost:4000/reserva/"+props.idReserva,{method:"PUT",headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },body:JSON.stringify({
            correo:reserva.correo,
            fecha:fecha.value,
            nombreMascota:reserva.nombreMascota,
            procedimiento:reserva.procedimiento,
            duracion:reserva.duracion,
            estado:estado.value,
            tipo:reserva.tipo
        })})
        setReserva([])
        props.setEdit([])
    }
    return (
        <div style={{padding:"50px",}}>
            <Row >
                
                <Col  style={{"background-color":"white","aling-items-center":"true"}}>
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
                                <option></option>
                                {["Agendado","Por Confirmar","Cancelada","Cumpilda"].map((_)=>(
                                    <option value={_}>{_}</option>
                                ))}
                                
                            </select>
                        </Col>
                    </Row>
                    <Button onClick={update}>Ingresar</Button>
                </Col>
                <Col></Col>
            </Row>
            
        </div>
    )
}export default Editar;