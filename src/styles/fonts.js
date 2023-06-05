import localFont from 'next/font/local';
 
// define your variable fonts
const inter = Inter();
const lora = Lora();
// define 2 weights of a non-variable font
const sourceCodePro400 = Source_Sans_Pro({ weight: '400' });
const sourceCodePro700 = Source_Sans_Pro({ weight: '700' });
// define a custom local font where apercu is stored in the styles folder
const apercu = localFont({ src: './fonts/apercu-bold-pro.woff2' });
 
export { apercu, lora, sourceCodePro400, sourceCodePro700, greatVibes };