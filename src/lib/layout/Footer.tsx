const Footer = () => {
  return (
    <div className="footer">
      <p>
        <a
          className="underlined underlinedThick"
          href="https://www.payamd.com"
          target="_blanck"
        >
          payamd.com
        </a>
        {" © "}
        {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
