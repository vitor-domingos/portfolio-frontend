
// 4. Funcionalidade "Ler Mais" para descrições de projetos
$('.my-project-card').each(function() {
    const $card = $(this);
    const $descriptionContainer = $card.find('.project-description-container');
    const $descriptionParagraph = $descriptionContainer.find('p');

    const maxHeight = 150; // Altura máxima antes de adicionar "ler mais" (em pixels)

    // Usamos um truque: temporariamente removemos o max-height para obter a altura real
    // e depois restauramos, se necessário. Isso garante que a comparação seja precisa.
    $descriptionContainer.css('max-height', 'none');
    const actualHeight = $descriptionParagraph[0].scrollHeight; // Altura real do conteúdo
    $descriptionContainer.css('max-height', ''); // Limpa o estilo inline

    if (actualHeight > maxHeight) {
        // Se o conteúdo for maior que o maxHeight, aplicamos o corte e adicionamos o botão
        $descriptionContainer.css({
            'max-height': `${maxHeight}px`,
            'overflow': 'hidden'
        });

        // Cria o botão "Ler Mais" usando jQuery
        const $readMoreButton = $('<button>')
            .text('Ler Mais')
            .addClass('btn btn-info btn-sm mt-2'); // Adiciona classes Bootstrap

        // Adiciona o botão ao final do card do projeto
        $card.append($readMoreButton);

        // Adiciona o evento de clique ao botão
        $readMoreButton.on('click', function() {
            if ($descriptionContainer.css('max-height') === `${maxHeight}px`) {
                // Se a descrição estiver colapsada, expande
                $descriptionContainer.css('max-height', 'none');
                $(this).text('Ler Menos'); // Altera o texto do botão
            } else {
                // Se a descrição estiver expandida, colapsa
                $descriptionContainer.css('max-height', `${maxHeight}px`);
                $(this).text('Ler Mais'); // Altera o texto do botão
            }
        });
    }
});