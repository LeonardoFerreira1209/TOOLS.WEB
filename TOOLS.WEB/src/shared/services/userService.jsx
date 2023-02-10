import { parseJwt } from '../utils/Utils';

export function isInvalidAuthentication(values, setError, setLoading) {
    if(values.user === "") { setError("Preencha o campo usuário!");  setLoading(false); return true; }
    
    if(values.password === "") { setError("Preencha o campo senha!"); setLoading(false); return true; }

    return false; 
}

export function isInvalidSignupPersonalData(values, setError) {
  if(values.firstName === "" || values.firstName === undefined) { setError("Preencha o campo nome!"); return true; }

  if(values.lastName === "" || values.lastName === undefined) { setError("Preencha o campo sobrenome!"); return true; }

  if(values.rg === "" || values.rg === undefined) { setError("Preencha o campo de Registro geral!"); return true; }

  if(values.cpf === "" || values.cpf === undefined) { setError("Preencha o campo Cadastro de pessoa física!"); return true; }

  if(values.birthday === "" || values.birthday === undefined) { setError("Preencha o campo Aniversário!"); return true; }

  return false;
}

export function isInvalidSignupUserData(values, setError) {
    if(values.username === "" || values.username === undefined) { setError("Preencha o campo nome de usuário!"); return true; }

    if(values.password === "" || values.password === undefined) { setError("Preencha o campo senha!"); return true; }

    if(values.email === "" || values.email === undefined) { setError("Preencha o campo e-mail!"); return true; }

    if(values.phoneNumber === "" || values.phoneNumber === undefined) { setError("Preencha o campo celular!"); return true; }

    return false;
}

export function authetication(navigate, state, setUser, setError, setLoading, values) {
    fetch(`${process.env.BASE_URL}gateway/user/authetication`, 
    {
      headers: {
        'username': values.user,
        'password': values.password
      },
        crossDomain:true,
        mode:'cors', 
        method: 'GET',
        cache: 'no-cache',
        credentials:'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      })
      .then(response => response.json()).then((results) => {
        if(results.sucesso){
          setUser({
            tokenJwt: results.dados.value,
            tokenObj: parseJwt(results.dados.value)
          });
          
          navigate(state?.path || "/dashboard");
        }
        else{
          setError(results.notificacoes[0].mensagem); setLoading(false);
        }
      },
      (error) => {
        console.error(error);

        setError("Ops, não conseguimos fazer a requisição!"); setLoading(false);
      }

    ).catch(error => {
      console.error(error);

      setError("Ops, tivemos um erro inesperado!"); setLoading(false);
    });
}

export function create(navigate, setError, setLoading, values, params) {
  setLoading(true);

  fetch(`${process.env.BASE_URL}gateway/user/create`, 
  {
    crossDomain:true,
    headers: {
      'Content-Type': 'application/json',
    },
    mode:'cors', 
    method: 'POST',
    body: JSON.stringify({
      FirstName: params.state.firstname,
      LastName: params.state.lastname,
      BirthDay: params.state.birthday,
      Gender: params.state.gender,
      RG: params.state.rg,
      CPF: params.state.cpf,
      UserName: values.username,
      Email: values.email,
      Password: values.password,
      PhoneNumber: values.phoneNumber,
      PlanId: `${process.env.PLAN_ID}`
    })
  })
  .then(response => response.json()).then((results) => {
      if(results.sucesso){    
        navigate("/signin");
      }
      else{
        setError(results.notificacoes[0].mensagem); setLoading(false);
      }
    },
    (error) => {
      console.error(error);

      setError("Ops, não conseguimos fazer a requisição!"); setLoading(false);
    }

  ).catch(error => {
    console.error(error);

    setError("Ops, tivemos um erro inesperado!"); setLoading(false);
  });
}