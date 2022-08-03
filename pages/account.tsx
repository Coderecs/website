import Layout from '../components/Layout/Layout'
function account() {
  const handle = "harasees_singh";
  return (
    <Layout>
        
        <div className='flex bg-yellow-300'>
            <div>
              <img src="assets/images/hottie.jpg" className='w-[250px]' />
              <div className='flex'>
                <a href='https://codeforces.com/profile/harasees_singh'> <p className='p-[7px]  text-blue-700 font-bold text-[15px]'>{handle}</p> </a>
                {/* make the color dynamic */}
                <img className='h-[12px] mt-[11px]' src='/assets/images/Codeforces_logo.svg.png' />
              </div>
            </div>
            <div>
              <p className='text-[40px] pl-8 pt-2 bg-pink-400'>Hey Dakota !</p>
              <p className='pl-8'> Here is what is new while you were away</p>

              <div className='flex absolute'>
                <div className='w-[600px] bg-blue-300 h-[300px] m-[30px] mr-[0px] rounded-md shadow-xl'>bar graph from chrome extension :
                number of problems vs rating (solved)</div>
                <div className='w-[500px] bg-pink-300 h-[300px] m-[30px] rounded-md shadow-xl'>pie chart showing number of problems solved corresponding to particular tag</div>

              </div>
            </div>

        </div>
        
    </Layout>
  )
}

export default account