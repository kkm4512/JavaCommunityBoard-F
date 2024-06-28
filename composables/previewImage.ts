export function previewSelectedImage (event:Event){
  console.log(event)
  const target = event.target as HTMLInputElement;
  const reader = new FileReader();
  if (target.files && target.files.length > 0) {
    const file = target.files[0]    
    reader.onload = function(e) {
      if (e.target && typeof e. target.result === 'string') return e.target.result;
    }
  }
}