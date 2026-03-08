import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import { Button } from "../../components/ui/button";
import AboutSidebar from "../../components/about/AboutSidebar";

const SizeGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <AboutSidebar />
        </div>
        
        <main className="w-full lg:w-[70vw] lg:ml-auto px-6">
        <PageHeader 
          title="Size Guide" 
          subtitle="Find your perfect fit with our comprehensive sizing guide"
        />
        
        <ContentSection title="Clothing Sizing">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted/20">
                  <th className="border border-border p-3 text-left font-light">Size</th>
                  <th className="border border-border p-3 text-left font-light">US</th>
                  <th className="border border-border p-3 text-left font-light">UK</th>
                  <th className="border border-border p-3 text-left font-light">EU</th>
                  <th className="border border-border p-3 text-left font-light">Chest (in)</th>
                  <th className="border border-border p-3 text-left font-light">Waist (in)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: "XS", us: "0-2", uk: "4-6", eu: "32-34", chest: "30-32", waist: "24-26" },
                  { size: "S", us: "4-6", uk: "8-10", eu: "36-38", chest: "33-35", waist: "27-29" },
                  { size: "M", us: "8-10", uk: "12-14", eu: "40-42", chest: "36-38", waist: "30-32" },
                  { size: "L", us: "12-14", uk: "16-18", eu: "44-46", chest: "39-41", waist: "33-35" },
                  { size: "XL", us: "16-18", uk: "20-22", eu: "48-50", chest: "42-44", waist: "36-38" },
                  { size: "XXL", us: "20-22", uk: "24-26", eu: "52-54", chest: "45-47", waist: "39-41" },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-muted/10">
                    <td className="border border-border p-3 font-medium">{row.size}</td>
                    <td className="border border-border p-3">{row.us}</td>
                    <td className="border border-border p-3">{row.uk}</td>
                    <td className="border border-border p-3">{row.eu}</td>
                    <td className="border border-border p-3">{row.chest}</td>
                    <td className="border border-border p-3">{row.waist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ContentSection>

        <ContentSection title="Shoe Sizing">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted/20">
                  <th className="border border-border p-3 text-left font-light">US</th>
                  <th className="border border-border p-3 text-left font-light">UK</th>
                  <th className="border border-border p-3 text-left font-light">EU</th>
                  <th className="border border-border p-3 text-left font-light">Foot Length (cm)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { us: "6", uk: "5", eu: "38", cm: "23.5" },
                  { us: "7", uk: "6", eu: "39", cm: "24.1" },
                  { us: "8", uk: "7", eu: "40", cm: "24.8" },
                  { us: "9", uk: "8", eu: "41", cm: "25.4" },
                  { us: "10", uk: "9", eu: "42", cm: "26.0" },
                  { us: "11", uk: "10", eu: "43", cm: "26.7" },
                  { us: "12", uk: "11", eu: "44", cm: "27.3" },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-muted/10">
                    <td className="border border-border p-3">{row.us}</td>
                    <td className="border border-border p-3">{row.uk}</td>
                    <td className="border border-border p-3">{row.eu}</td>
                    <td className="border border-border p-3">{row.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ContentSection>

        <ContentSection title="Need Help?">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Still unsure about sizing? Our style consultants are here to help you find the perfect fit. 
              Download our printable size guide or contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="rounded-none">
                Download PDF Guide
              </Button>
              <Button className="rounded-none">
                Contact Support
              </Button>
            </div>
          </div>
        </ContentSection>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default SizeGuide;