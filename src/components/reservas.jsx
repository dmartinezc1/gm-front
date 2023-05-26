import { useEffect, useState } from "react";
import { Button ,Row,FormSelect} from "react-bootstrap";
import { useNavigate  } from "react-router-dom";
import Editar from "./editar";
const estados = ["Por Confirmar","Agendado","Cancelada","Cumpilda"]
function ViewReservas(){
    const navigate = useNavigate();
    const [filtro, setFiltro]=useState("Todas")
    const [reservas, setReservas] = useState([])
    const [edit, setEdit] = useState([])
    useEffect(()=>{
        fetch("http://localhost:4000/reserva").then((data)=>data.json()).then((_)=>setReservas(_))
    },[edit])
    function cambioFiltro(event){
        let valor = event.target.value;
        if(valor==="Filtrar por estado"){
            valor="Todas"
        }
        setFiltro(valor)
    }
    function editar(event){
        setEdit(event.target.value)
        console.log(event.target.value)
    }
    return (
        <div style={{margin:"50px","background-color":"white"}}>
            <div class="float-start" style={{padding:"12px"}}>
                <Button style={{position:"left"}}onClick={()=>navigate("/")}>Volver</Button>
                {edit.length>0?<Button style={{marginLeft:"30px"}}onClick={()=>setEdit([])}>Dejar de editar</Button>:<></>}
            </div>
            <div class="float-end" style={{padding:"12px"}}>
                
                <FormSelect id="sFiltro" style={{position:"left"}} defaultValue="Todas" onChange={cambioFiltro} >
                    <option value="Todas">Todas</option>
                    {estados.map((_)=>
                        <option value={_}>{_}</option>
                    )}
                    
                </FormSelect>
            </div>
            <br/>
            <br/>
            {edit.length>0?<Editar idReserva={edit[0]} correo={edit[1]} setEdit={setEdit}></Editar>:<></>}
            <hr></hr>
            <table class="table" style={{"background-color":"white"}}>
                <thead>
                    <th scope="col">ID</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Nombre Mascota</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Procedimiento</th>
                    <th scope="col">Duración (h)</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Editar</th>
                </thead>
                <tbody>
                    {reservas?.filter((reserva)=>filtro!=="Todas"?reserva.estado===filtro:true).map((reserva)=>(
                        <tr>
                            <td>{reserva.id}</td>
                            <td>{reserva.correo}</td>
                            <td>{reserva.fecha}</td>
                            <td>{reserva.nombreMascota}</td>
                            <td>{reserva.tipo}</td>
                            <td>{reserva.procedimiento}</td>
                            <td>{reserva.duracion}</td>
                            <td>{reserva.estado}</td>
                            <td><Button value={[reserva.id,reserva.correo]} onClick={editar}>Editar</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}
export default ViewReservas;