import bus from '../utils/bus'

export default function useFlashMessage(){
  function setFlashMessage(msg: string,type: string){
    console.log('entramos no setFlashMessage')
    try {
      bus.emit('flash',{
        message: msg,
        type
      })
    } catch (error) {
      console.error('erro no bus.emit ' + error)
    }
    
  }
  return {setFlashMessage}
}
