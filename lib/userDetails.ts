const ratingDictBuilder = (problemList : any[]) : any => {
    let ratingDict : any = {};
    problemList.forEach((problem : any)=>{
        if(ratingDict[problem.rating])
            ratingDict[problem.rating].push(problem);
        else
            ratingDict[problem.rating] = [problem];
    })
    let list = [];
    let mx = 1;
    for(let i = 800; i <= 3500; i += 100){
        if(! ratingDict[i]) list.push(0);

        else{
            list.push(ratingDict[i].length);
            mx = Math.max(mx, ratingDict[i].length);
        }
    }
    for(let i = 0; i < list.length; i++){
        list[i] *= 100;
        list[i] /= mx;
    }
    return list;
}

const tagsDictBuilder = (problemList : any) : any => {
    let tagDict : any = {};
    problemList.forEach((problem : any)=>{
        problem.tags.forEach((tag : string)=>{
            if(tagDict[tag])
                tagDict[tag].push(problem);
            else
                tagDict[tag] = [problem];
        })
    })
    return tagDict;
}

export {ratingDictBuilder, tagsDictBuilder}