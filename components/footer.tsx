export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="mt-4 text-sm text-foreground/80">
              Grandpa&apos;s Plant Shop is your trusted source for beautiful plants and expert gardening advice in Algeria.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="/products" className="text-foreground/80 hover:text-foreground">Products</a>
              </li>
              <li>
                <a href="/categories" className="text-foreground/80 hover:text-foreground">Categories</a>
              </li>
              <li>
                <a href="/about" className="text-foreground/80 hover:text-foreground">About</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-foreground/80">Phone: +213 XX XX XX XX</li>
              <li className="text-foreground/80">Email: contact@grandpasplants.dz</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Delivery</h3>
            <p className="mt-4 text-sm text-foreground/80">
              We deliver to all wilayas in Algeria. Delivery fees vary by location.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-foreground/80">
          <p>&copy; {new Date().getFullYear()} Grandpa&apos;s Plant Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}