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

export function getUsers(tokenJwt, setUsers, value){
    fetch(`${process.env.BASE_URL}api/usermanager/get/users/by/name?name=${value}`, 
    {
      headers: {
        'Authorization': `Bearer ${tokenJwt}`
      },
        crossDomain:true,
        mode:'cors', 
        cache: 'no-cache',
        credentials:'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        method: 'GET',
      })
      .then(response => response.json()).then((results) => {
        if(results.Sucesso){
          setUsers(results.Dados.users);
        }
        else{
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
      }
    ).catch(error => {
      console.error(error);
      toast.error("Ops, tivemos um erro inesperado!", {
        theme: 'light',
        autoClose: true
      })
    });
}

export function getProfileUser(userId, tokenJwt, setValues, setAvatarImage, setLoading){
  fetch(`${process.env.BASE_URL}api/usermanager/get/user/userid/${userId}`, 
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
      if(results.Sucesso){
        setTimeout(() => {
          setValues({
            id: results.Dados.id,
            username: results.Dados.userName,
            password: results.Dados.password,
            email: results.Dados.email,
            phoneNumber: results.Dados.phoneNumber,
            firstName: results.Dados.firstName,
            lastName: results.Dados.lastName,
            gender: results.Dados.gender,
            rg: results.Dados.rg,
            cpf: results.Dados.cpf,
            status: results.Dados.status
          })}, 1000);
  
        setAvatarImage(results.Dados.imageUri);
      }
      else {
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
    }
  ).catch(error => {
    console.error(error);
    toast.error("Ops, tivemos um erro inesperado!", {
      theme: 'light',
      autoClose: true
    })
  });
}

export function getChats(tokenJwt, setChats, value){
  fetch(`${process.env.BASE_URL}api/chatmanager/get/chats/by/user/${value}`, 
  {
    headers: {
      'Authorization': `Bearer ${tokenJwt}`
    },
      crossDomain:true,
      mode:'cors', 
      cache: 'no-cache',
      credentials:'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      method: 'GET',
    })
    .then(response => response.json()).then((results) => {
      if(results.Sucesso){
        setChats(results.Dados);
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
    }
  ).catch(error => {
    console.error(error);
    toast.error("Ops, tivemos um erro inesperado!", {
      theme: 'light',
      autoClose: true
    })
  });
}

export function getChatMessages(tokenJwt, setChatMessages, value){
  fetch(`${process.env.BASE_URL}api/chatmanager/get/messages/by/chat/${value}`, 
  {
    headers: {
      'Authorization': `Bearer ${tokenJwt}`
    },
      crossDomain:true,
      mode:'cors', 
      cache: 'no-cache',
      credentials:'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      method: 'GET',
    })
    .then(response => response.json()).then((results) => {
      if(results.Sucesso){
        setChatMessages(results.Dados);
      }
      else{
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
    }
  ).catch(error => {
    console.error(error);
    toast.error("Ops, tivemos um erro inesperado!", {
      theme: 'light',
      autoClose: true
    })
  });
}

export function createChat(tokenJwt, setusersChatSelected, setChatSelected, values){
  fetch(`${process.env.BASE_URL}api/chatmanager/create/chat`, 
  {
    headers: {
      'Authorization': `Bearer ${tokenJwt}`,
      'Content-Type': 'application/json',
    },
      crossDomain:true,
      mode:'cors', 
      cache: 'no-cache',
      credentials:'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      method: 'POST',
      body: JSON.stringify({
        FirstUserId: values.FirstUserId,
        SecondUserId: values.SecondUserId
      })
    })
    .then(response => response.json()).then((results) => {
      if(results.Sucesso){
        setusersChatSelected(results.Dados.secondUserId);
        setChatSelected(results.Dados.id);
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
    }
  ).catch(error => {
    console.error(error);
    toast.error("Ops, tivemos um erro inesperado!", {
      theme: 'light',
      autoClose: true
    })
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
          `/confirm-email`,  { state: results.Dados.id }
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

export function update(tokenJwt, values, setLoading) {
  fetch(`${process.env.BASE_URL}api/usermanager/update/user`, {
    crossDomain:true,
    mode:'cors', 
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenJwt}`
    },
    body: JSON.stringify({
      Id: values.id,
      Username: values.username,
      CurrentPassword: values.currentPassword,
      Password: values.password,
      Email: values.email,
      PhoneNumber: values.phoneNumber,
      FirstName: values.firstName,
      LastName: values.lastName,
      Gender: values.gender,
      Rg: values.rg,
      Cpf: values.cpf,
      status: values.status,
      imageUri: values.imageUri
    })
  })
  .then(response => response.json()).then((results) => {
      if(results.Sucesso) {
        toast.success("Edição realizada com sucesso!", {
          theme: 'light',
          autoClose: true
        });
        setLoading(false);
      }
      else {
        toast.info(results.Notificacoes[0].Mensagem, {
          theme: 'light',
          autoClose: true
        });
        setLoading(false);
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