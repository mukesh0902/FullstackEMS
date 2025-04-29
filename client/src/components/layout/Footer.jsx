const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-4 text-center text-white mt-8">
      <div className="container mx-auto">
        <p>&copy; {year} Employee Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 