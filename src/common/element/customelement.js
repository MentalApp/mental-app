import { Button } from 'react-bootstrap';


const ButtonCustom = ({ title, onClick }) => {
    return (
        <button className="btn-control" onClick={onClick}> { title }</button >
    );
}

const InputCustom = ({length,onChange}) => {
    return (
        <input className="input-control" maxLength={length}></input>
    )
}

export {ButtonCustom,InputCustom};