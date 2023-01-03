import { FocusEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../styles/form.css"

interface Users {
    nome: string,
    telefone: string,
    endereco: string
}

function CadastrarPet() {
    const route = useNavigate()
	const [error, setError] = useState<String>();
    const {register, handleSubmit} = useForm<any>();

    function formatTelephone(event: FocusEvent<HTMLInputElement, Element>) {
        event.currentTarget.value = event.currentTarget.value.replace(/[^\d]/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    async function fetchPetInBackend(data: any) {
        
        if (data) {
            try {
                const req = await fetch("http://localhost:5000/api/cadastrarPet", {
                    body: JSON.stringify(data),
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Acess-Control-Allow-Origin": "*"
                    }
                });
                route("/pets");
                

            } catch (error) {
				setError(`Erro ocorrido ao adicionar, contacte o desenvolvedor. ${error}`);
            }
        }
        else {
			setError("Preencha todos os campos");
        }   
    }

    return (
        <form action="post" onSubmit={handleSubmit(fetchPetInBackend)}>

            <input type="text" {...register("nome")} placeholder="Nome*" required/>

            <input type="number" minLength={1} placeholder="Idade*" min={0} {...register("idade")} required/>
           
           <div className="selectContainer">
               <select defaultValue="c" {...register("especie")}>
                <option value="c">Cachorro</option>
                <option value="g">Gato</option>
               </select>
           </div>

           <input type="text" {...register("raca")} placeholder="Raça*" required/>
           <input type="text" {...register("nomeDono")} placeholder="Nome do Dono*" required/>
           <input type="tel"  {...register("telefoneDono")} placeholder="Telefone de Contato*" minLength={11} maxLength={11} onBlur={((e) => {formatTelephone(e)})} required/>

            
            <button>Cadastrar</button>

            <span className="errorSpan">{error}</span>
        </form>
    );
}

export default CadastrarPet;