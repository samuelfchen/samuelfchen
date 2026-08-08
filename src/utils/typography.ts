import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: '0',
  headerFontFamily: ['Montserrat', 'sans-serif'],
  bodyFontFamily: ['Montserrat', 'sans-serif'],
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['800', '400'],
    },
    {
      name: 'Montserrat',
      styles: ['400', '300', '200'],
    },
  ],
});

export default typography;
