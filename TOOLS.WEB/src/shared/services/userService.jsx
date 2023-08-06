import { parseJwt } from '../utils/Utils';
import { toast } from 'react-toastify';

export function isInvalidAuthentication(values) {
    let errors = [];
    if(values.user === "") { 
      errors.push("Preencha o campo usuário!!");
    }
    if(values.password === "") { 
      errors.push("Preencha o campo senha!");
    }
    return errors; 
}

export function isInvalidSignupPersonalData(values) {
  let errors = [];
  
  if(values.firstName === "" || values.firstName === undefined) { 
    errors.push("Preencha o campo nome!");
  }
  if(values.lastName === "" || values.lastName === undefined) { 
    errors.push("Preencha o campo sobrenome!") 
  }
  if(values.rg === "" || values.rg === undefined) { 
    errors.push("Preencha o campo rg!") 
  }
  if(values.cpf === "" || values.cpf === undefined) { 
    errors.push("Preencha o campo cadastro de pessoa física!") 
  }
  return errors;
}

export function isInvalidSignupUserData(values) {
    let errors = [];

    if(values.username === "" || values.username === undefined) { 
      errors.push("Preencha o campo nome de usuário!");
    }
    if(values.password === "" || values.password === undefined) { 
      errors.push("Preencha o campo senha!"); 
    }
    if(values.email === "" || values.email === undefined) { 
      errors.push("Preencha o campo e-mail!"); 
    }
    if(values.phoneNumber === "" || values.phoneNumber === undefined) { 
      errors.push("Preencha o campo celular!"); 
    }
    return errors;
}

export function authetication(navigate, state, setUser, setLoading, values) {
    fetch(`${process.env.BASE_URL}api/usermanager/authetication`, 
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
        if(results.Sucesso){
          setUser({
            validTo: results.Dados.validTo,
            tokenJwt: results.Dados.token,
            refreshTokenJwt: results.Dados.refreshToken,
            tokenObj: parseJwt(results.Dados.token),
          });
          
          navigate(state?.path || "/dashboard");
        }
        else{
          setLoading(false);
          results.Notificacoes.forEach((error) => {
            toast.error(error.Mensagem, {
              theme: 'light',
              autoClose: true
            })
          })
        }
      },
      (error) => {
        console.error(error);
        toast.error("Ops, não conseguimos fazer a requisição!", {
          theme: 'light',
          autoClose: true
        })
        setLoading(false)
      }

    ).catch(error => {
      console.error(error);
      toast.error("Ops, tivemos um erro inesperado!", {
        theme: 'light',
        autoClose: true
      })
      setLoading(false);
    });
}

export function confirmEmail(navigate, setError, setLoading, userId, code) {
  fetch(`${process.env.BASE_URL}api/usermanager/activate/user/code/${code}/userid/${userId}`, 
  {
      crossDomain:true,
      mode:'cors', 
      method: 'GET',
      cache: 'no-cache',
      credentials:'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
    .then(response => response.json()).then(
      (results) => {
      if(results.Sucesso){
        navigate("/signin");
      }
      else{
        setError(results.Notificacoes[0].Mensagem) 
        ?? "Erro não tratado no servidor!"; 
        setLoading(false);
      }
    },
    (error) => {
      console.error(error);
      setError("Ops, não conseguimos fazer a requisição!"); 
      setLoading(false);
    }

  ).catch(error => {
    console.error(error);
    setError("Ops, tivemos um erro inesperado!"); 
    setLoading(false);
  });
}

export function create(navigate, setLoading, values, params) {
  setLoading(true);

  fetch(`${process.env.BASE_URL}api/usermanager/create/user`, 
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
      Gender: params.state.gender,
      RG: params.state.rg,
      CPF: params.state.cpf,
      UserName: values.username,
      Email: values.email,
      Password: values.password,
      PhoneNumber: values.phoneNumber
    })
  })
  .then(response => response.json()).then(
    (results) => {
      if(results.Sucesso){    
        navigate(
          `/confirm-email/userId/${results.Dados.id}`
          )
      }
      else{
          setLoading(false);
          results.Notificacoes.forEach((error) => {
            toast.error(error.Mensagem, {
              theme: 'light',
              autoClose: true
            })
          })
      }
    },
    (error) => {
      console.error(error);
      toast.error("Ops, não conseguimos fazer a requisição!", {
        theme: 'light',
        autoClose: true
      })
      setLoading(false)
    }

  ).catch(error => {
    console.error(error);
    toast.error("Ops, tivemos um erro inesperado!", {
      theme: 'light',
      autoClose: true
    })
    setLoading(false);
  });
}

export function getRoles(tokenJwt, setRoles, setError, setLoading) {
  fetch(`${process.env.BASE_URL}gateway/role/getall`, 
  {
      headers: {
        'Authorization': `Bearer ${tokenJwt}`
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
        setRoles(results.dados);
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