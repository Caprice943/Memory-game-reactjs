function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer style={{
            fixed: 'bottom',
            width: '100%',
            marginTop: '15px',
            padding: '5px',
            backgroundColor: 'transparent',
            color: 'white',
            textAlign: 'center',
            fontSize: ' 15px',
            fontStyle: 'italic',
        }}>
            <p>© {year} Memory Game - Developed and designed by Caprice NDOMBI MOUIRI.</p>
        </footer>
    );
}

export default Footer;