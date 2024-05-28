function formatar(mascara, documento) {
    let i = documento.value.length;
    let saida = '#';
    let texto = mascara.substring(i);
    while (texto.substring(0, 1) != saida && texto.length ) {
      documento.value += texto.substring(0, 1);
      i++;
      texto = mascara.substring(i);
    }
  }


function confimDelete(event, form) {
    var decision = confirm("Deseja deletar este usuário?");  

    if(!decision) {
        event.preventDefault();
    } else {
        form.submit();
    }
}