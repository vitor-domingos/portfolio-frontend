$(document).ready(function() {
    // Exemplo de funcionalidade jQuery:
    // Smooth scroll para links de navegação
     $('nav a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 56 // Ajuste para a altura da navbar fixa
            }, 800);
        }
    })

    // Atualiza o ano no rodapé
    $('#currentYear').text(new Date().getFullYear());
  
});