import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useEffect, useState } from 'react'
import Picker from './Picker'
import Comments from './Comments'
import { events } from './constants'
import ProfilePicker from './ProfilePicker'

function App() {
  let [isOpen, setIsOpen] = useState(false);
  let [index,setIndex]=useState(1);
  let [isCompleted, setIsCompleted] = useState(false)
  let [selectedEvent, setSelectedEvent] = useState([]);
  let [eventofProfile,setEventofProfile]=useState([]);
  console.log(events);
  const name=localStorage.getItem('profile')
  useEffect(()=>{
    setEventofProfile(events.filter(event=>event.assignedTo===name))
  },[name])

  useEffect(()=>{
    setSelectedEvent(eventofProfile.filter(event=>event.isCompleted===isCompleted))
  },[isCompleted])
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <div className='w-screen min-h-screen '>
      <div className="absolute top-0 right-0 p-10">
        <ProfilePicker />
      </div>
      <div className='p-10 space-y-10'>
        <div className="flex flex-col">
          <div className="flex justify-center">
            <div
              className="p-1 dark:border-slate-300/20"
            >
              <div className="flex text-xs font-semibold leading-5 ">
                <button
                  className={`w-auto ${isCompleted?"bg-blue-600 text-slate-200":"bg-white text-black"} px-3 py-1  focus:outline-none`}
                  onClick={() => setIsCompleted(!isCompleted)}
                >
                  Completed
                </button>
                <button
                  className={` px-3 py-1 ${!isCompleted?"bg-blue-600 text-slate-200":"bg-white text-black"} focus:outline-none `}
                  onClick={() => setIsCompleted(!isCompleted)}
                >
                  Pending
                </button>
              </div>
            </div>
          </div>
        </div>
        {
          selectedEvent.map((event)=>(
        <Button onClick={
          ()=>{
            setIndex(event.id);
            open();
            }} className="bg-slate-200 rounded w-full">
          <div class="flex flex-row px-4 py-8 sm:px-6">
            <img
              class="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
              src={event.avatar}
            />

            <div class="flex max-w-3xl items-center">
              <p>{event.title}</p>
            </div>
          </div>
        </Button>
          ))
        }
      </div>
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl space-y-5 ">
                  <div className='flex w-full justify-between items-center '>
                    <img src="/cc.png" alt="CC" className='cursor-pointer h-4 w-4 object-fit' />
                    <div className='flex space-x-2 items-center text-red-300'>

                      <img src="/bin.png" alt="Bin" className='cursor-pointer h-4 w-4 object-fit' />
                      <img src="/close.png" alt="Bin" className='cursor-pointer h-2.5 object-fit' onClick={close} />
                      {/* < className='cursor-pointer' >X</h1> */}
                    </div>

                  </div>
                  <div className='space-y-2'>
                    <h3 className=" bg-white py-[10px] px-[20px] rounded-full text-base/7 text-[#E92C2C] font-semibold border text-[20px]">
                      Flower Arrangement
                    </h3>
                    <div className=" bg-white py-[11px] px-[18px] items-center rounded-full  font-medium border text-[16px] flex space-x-2">
                      <img src="/calendar.png" className='h-4 w-4 ' /><h4>Dec 5, 2024 at 8:00-10:00 AM </h4>
                    </div>
                  </div>
                  <div className=" bg-white  items-center rounded-full  font-medium text-[16px] grid grid-cols-2 px-[15px]">
                    <div className='flex items-center gap-x-3'>
                      <img src="/user.png" className='h-4 w-4 ' />
                      <h4 className='italic'>Assign to:</h4>
                    </div>
                    <Picker />
                  </div>
                  <div className=" bg-white  items-start rounded-full  font-medium text-[16px] grid grid-cols-2 px-[15px] ">
                    <div className='flex items-center gap-x-3 mt-2'>
                      <img src="/note.png" className='h-4 w-4 ' />
                      <h4 className='italic'>Note:</h4>
                    </div>
                    <textarea
                      id="OrderNotes"
                      className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm outline-none border p-2"
                      rows="4"
                      placeholder="Enter any additional order notes..."
                    />
                  </div>
                  <hr />
                  <h1>Comments</h1>
                  <Comments data={events[index-1].comments}/>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
export default App
