export function pageComputed(curPage:Ref<number>,totalPages:Ref<number>){
  const disPlayedPages = computed(()=>{
    const maxPage = 5;
    const half = Math.floor(maxPage/2);
    let start = Math.max(curPage.value - half,1)
    let end = Math.min(start + maxPage - 1,totalPages.value)
  
    if (end - start < maxPage - 1) start = Math.max(end - maxPage + 1, 1);
  
    const pages = [];
    for ( let i=start; i <= end; i++ ) {
      pages.push(i);
    }
    return pages
  })
  return {
    disPlayedPages,
  }
}
