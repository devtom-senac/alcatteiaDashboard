/** @type {import('tailwindcss').Config} */
export default {
  // Onde o Tailwind deve procurar por classes CSS no seu projeto
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Aqui você pode estender o tema padrão do Tailwind,
      // por exemplo, adicionando novas cores ou tamanhos.
      // Por enquanto, está vazio para usar apenas as cores padrão.
    },
  },
  plugins: [], // Plugins adicionais do Tailwind, se precisar.
}
