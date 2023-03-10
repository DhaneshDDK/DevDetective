/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily : { 
        'git' :  ['Space Mono', 'monospace']
       },
       colors: {
        bg: '#f6f8ff',
        bgcontent: '#fefefe',
        lmtext: '#4b6a9b',
        lmtextalt: '#2b3442',
        lmiconbg: 'brightness(100%)',
        /* Btn */
        btn: '#0079ff',
        btnhover: '#60abff',
      },
    },
  },
  plugins: [],
}
