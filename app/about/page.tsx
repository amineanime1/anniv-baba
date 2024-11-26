import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-playfair font-bold text-center mb-12">About Grandpa&apos;s Plant Shop</h1>
        
        <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Our garden"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed mb-6">
            Welcome to Grandpa&apos;s Plant Shop, where our passion for plants meets decades of gardening expertise. 
            What started as a small family garden has blossomed into Algeria&apos;s trusted source for quality plants 
            and expert advice.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            Our mission is simple: to share the joy of gardening and help create beautiful, green spaces in homes 
            across Algeria. Every plant in our collection is carefully selected and nurtured to ensure it thrives 
            in its new home.
          </p>

          <p className="text-lg leading-relaxed">
            With years of experience in plant care and cultivation, we&apos;re not just selling plants – we&apos;re 
            sharing knowledge and passion that spans generations. Whether you&apos;re a seasoned gardener or just 
            starting your plant journey, we&apos;re here to help your green family grow.
          </p>
        </div>
      </div>
    </div>
  );
}