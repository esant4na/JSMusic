// Importa React.
import * as React from "react"


// Importa componentes Slider desde Radix UI.
//
// Radix UI es una librería de componentes accesibles.
import * as SliderPrimitive from "@radix-ui/react-slider"


// Importa clsx.
//
// clsx sirve para combinar clases CSS dinámicamente.
import cn from "clsx"



/* =========================================================
   COMPONENTE SLIDER
========================================================= */

// React.forwardRef
//
// Permite pasar referencias (refs)
// hacia el componente interno.
//
// Esto es útil para:
// - accesibilidad
// - focus
// - control externo
export const Slider = React.forwardRef<

  // Tipo del elemento Root de Radix.
  React.ElementRef<typeof SliderPrimitive.Root>,
  
  // Props del Slider de Radix.
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(
  
  // Componente principal.
  ({ className, ...props }, ref) => (

  // Root = contenedor principal del slider.
  <SliderPrimitive.Root

    // Referencia enviada desde afuera.
    ref={ref}
    className={cn(
      "relative flex touch-none select-none items-center group",
      className
    )}
    {...props}
  >

      {/* ===================================================
          TRACK
      =================================================== */}

      {/* 
          Barra completa del slider.
      */}
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-gray-800">

        {/* 
            Parte activa/rellena del slider.
            
            Cambia a verde al hover.
        */}
      <SliderPrimitive.Range className="absolute h-full bg-white group-hover:bg-green-400" />
    </SliderPrimitive.Track>

      {/* ===================================================
          THUMB
      =================================================== */}

      {/* 
          Thumb = círculo arrastrable.
          
          hidden:
          oculto normalmente.
          
          group-hover:block:
          aparece al hover.
      */}
    <SliderPrimitive.Thumb className="hidden group-hover:block h-3 w-3 bg-white rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))

// Nombre visible del componente.
// Útil para debugging en React DevTools.
Slider.displayName = SliderPrimitive.Root.displayName

