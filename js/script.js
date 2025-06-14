  
// 1. Adiciona/Remove a classe 'active' na navegação com base na rolagem
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

 // 2. Funcionalidade "Ler Mais" para descrições de projetos
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

// 3. Atualiza o ano no rodapé
$('#currentYear').text(new Date().getFullYear());

