import SearchForm from "../search/SearchForm";

const Hero = () => {
  return (
    <div 
    style={{ backgroundImage:"url('https://images.pexels.com/photos/1981043/pexels-photo-1981043.jpeg?auto=compress&cs=tinysrgb&fit=crop&fp-y=0.17&h=500&sharp=20&w=1400')"}} 
    className="bg-cover z-10 h-96 flex flex-wrap content-center justify-items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="w-1/2 text-white font-bold text-3xl mx-auto mb-4">The best photos & images shared by creators.</h1>
          <SearchForm />
      </div> 
    </div>
  );
};
export default Hero;
