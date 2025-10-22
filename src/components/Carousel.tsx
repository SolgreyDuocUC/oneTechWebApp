import React from "react";
// Importa las imágenes que quieres usar.
// Asegúrate de que las rutas sean correctas para la estructura de tu proyecto.
// Por ejemplo, si tus imágenes están en 'src/assets/image1.jpg'
// import image1 from './assets/image1.jpg'; 
// import image2 from './assets/image2.jpg';
// import image3 from './assets/image3.jpg';

function Carousel (){

    // Define un array con los datos de tus imágenes. 
    // Esto es opcional, pero hace el código más limpio y fácil de mantener.
    const slides = [
        {
            src: "ruta/a/tu/primera/imagen.jpg", // ¡Reemplaza con la ruta real!
            alt: "Primera imagen del carrusel",
            active: true // Solo la primera debe tener 'active: true'
        },
        {
            src: "ruta/a/tu/segunda/imagen.png", // ¡Reemplaza con la ruta real!
            alt: "Segunda imagen del carrusel",
            active: false
        },
        {
            src: "ruta/a/tu/tercera/imagen.webp", // ¡Reemplaza con la ruta real!
            alt: "Tercera imagen del carrusel",
            active: false
        }
    ];

    return(
        <>
            <div id="carouselExampleControls" className="carousel slide">
                <div className="carousel-inner">
                    {/* Mapeamos el array de slides para crear los elementos del carrusel */}
                    {slides.map((slide, index) => (
                        <div 
                            key={index} // Se usa 'key' para la lista en React
                            className={`carousel-item ${slide.active ? 'active' : ''}`}
                        >
                            <img 
                                className="d-block w-100" 
                                // Usamos la ruta del objeto 'slide'
                                src={slide.src} 
                                alt={slide.alt}
                            /> 
                        </div>
                    ))}
                </div>
                
                {/* Control anterior */}
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Anterior</span>
                </a>
                
                {/* Control siguiente */}
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Siguiente</span>
                </a>
            </div>
        </>
    );

}

export default Carousel;