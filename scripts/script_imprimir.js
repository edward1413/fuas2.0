document.getElementById('btn-imprimir').addEventListener('click', function () {
    // Crear un iframe oculto
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.top = '-9999px';
    iframe.style.left = '-9999px';
    iframe.src = 'print-fua.html'; // Ruta a tu archivo de impresión
    document.body.appendChild(iframe);

    // Esperar a que el iframe cargue
    iframe.onload = function () {
        // Obtener el contenido del iframe
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        // Asegurarse de que el iframe tenga el contenido
        if (iframeDocument.getElementById('print-marks')) {
            // Imprimir el iframe
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        } else {
            console.error("El elemento #print-marks no se encontró en print-fua.html");
        }

        // Opcional: remover el iframe después de imprimir
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 100);
    };
});