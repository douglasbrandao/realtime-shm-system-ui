import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  :root{
    /* --background: #F5FAF6; */
    --background: #F5F7FA;
    --input-border: #C4CACF;
    --input-focus: #008631;
    --input-placeholder: #BBC3D0;
    --button-background: #00013C;
    --button-hover: #193659;
    --text-color: #00013C;
    --text-hover: #32A041;
    --text-email: #90a0b7;
    --success-background: #E6FFE6;
    --success-border: #85D678;
    --danger-background: #ffe6e6;
    --danger-border: #ff8f8f;
    --primary-background: #E6F6FF;
    --primary-border: #78B4D6;
    --warning-background: #FFFDE6;
    --warning-border: #D6C178;
    --badge-success: #42B847;
    --badge-danger: #E34D40;
    --badge-warning: #F1B312;
    --badge-primary: #43B0FF;
    --svg-color: #cad5e4;
    --svg-hover: #AFE0B7;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    accent-color: var(--text-color);

    :focus {
      outline: 0;
    }
  }
  
  body{
    background-color: var(--background);
    color: var(--text-color);
  }

  span, p{
    color: var(--text-color);
    font-size: 0.8rem;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
  }

  label {
    color: var(--text-color);
    font-size: 0.8rem;
    font-weight: 500;
    display: inline-block;
    margin-bottom: 0.25rem;
  }

  input:not([type='radio'], [type='checkbox']), select {
    width: 100%;
    padding: 12px;
    background-color: white;
    border: 1px solid var(--input-border);
    margin-bottom: 0.675rem;
    border-radius: .25rem;
    transition: border 0.3s ease;
    font-family: 'Roboto';
    font-size: .875rem;
    color: var(--text-color);

    &:disabled {
      background-color: #f3f3f3;
      color: #CACCCF;
    }

    &::placeholder {
      color: var(--input-placeholder);
    }

    &:focus {
      color: var(--text-color);
    }
  }

  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;

    &:hover {
      color: var(--text-hover);
    }
  }
`;

export default GlobalStyle;
