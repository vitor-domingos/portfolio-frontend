$(document).ready(function() {
    // 1. Rolagem suave para os links da navegação
    $('a.nav-link[href^="#"]').on('click', function(e) {
        e.preventDefault(); // Previne o comportamento padrão do link

        const targetId = $(this).attr('href'); // Obtém o ID do alvo (ex: #sobremin)
        $('html, body').animate({
            scrollTop: $(targetId).offset().top // Rola até o topo do elemento alvo
        }, 800); // Duração da animação em milissegundos (800ms)

        // Opcional: Fechar o navbar responsivo após o clique (para dispositivos móveis)
        // O Bootstrap já lida com isso automaticamente para nav-links dentro de um collapse,
        // mas se precisar de controle manual:
        if ($('.navbar-toggler').is(':visible')) { // Verifica se o toggler está visível (indicando mobile)
            $('.navbar-collapse').collapse('hide'); // Usa o método de collapse do Bootstrap para esconder
        }
    });

    // 2. Atualiza o ano no rodapé
    $('#currentYear').text(new Date().getFullYear());

    // 3. Adiciona/Remove a classe 'active' na navegação com base na rolagem
    const $sections = $('section');
    const $navLinks = $('.navbar-nav .nav-link');
    const navbarHeight = $('.navbar').outerHeight(); // Obtém a altura total do navbar

    function activateNavLink() {
        let currentSectionId = '';
        const scrollPos = $(window).scrollTop(); // Posição atual da rolagem

        $sections.each(function() {
            const $section = $(this);
            const sectionTop = $section.offset().top - navbarHeight; // Ajusta para a altura do navbar fixo
            const sectionBottom = sectionTop + $section.outerHeight();

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                currentSectionId = $section.attr('id');
            }
        });

        $navLinks.removeClass('active'); // Remove 'active' de todos
        $navLinks.each(function() {
            if ($(this).attr('href').includes(currentSectionId)) {
                $(this).addClass('active'); // Adiciona 'active' ao link correspondente
            }
        });
    }

    $(window).on('scroll', activateNavLink);
    activateNavLink(); // Chamar na carga inicial para definir a seção ativa

    // 4. Funcionalidade "Ler Mais" para descrições de projetos
    $('.my-project-card').each(function() {
        const $card = $(this);
        const $descriptionContainer = $card.find('.project-description-container');
        const $descriptionParagraph = $descriptionContainer.find('p');

        const maxHeight = 150; // Altura máxima antes de adicionar "ler mais"

        // Usamos um truque: temporariamente removemos o max-height para obter a altura real
        // e depois restauramos, se necessário.
        $descriptionContainer.css('max-height', 'none');
        const actualHeight = $descriptionParagraph[0].scrollHeight; // Altura real do conteúdo
        $descriptionContainer.css('max-height', ''); // Limpa o estilo inline

        if (actualHeight > maxHeight) {
            $descriptionContainer.css({
                'max-height': `${maxHeight}px`,
                'overflow': 'hidden'
            });

            const $readMoreButton = $('<button>')
                .text('Ler Mais')
                .addClass('btn btn-info btn-sm mt-2');

            $card.append($readMoreButton);

            $readMoreButton.on('click', function() {
                if ($descriptionContainer.css('max-height') === `${maxHeight}px`) {
                    $descriptionContainer.css('max-height', 'none');
                    $(this).text('Ler Menos');
                } else {
                    $descriptionContainer.css('max-height', `${maxHeight}px`);
                    $(this).text('Ler Mais');
                }
            });
        }
    });
});