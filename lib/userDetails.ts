const ratingDictBuilder = (problemList : any[]) : any => {
    let ratingDict : any = {}
    problemList.forEach((problem : any)=>{
        if(ratingDict[problem.rating])
            ratingDict[problem.rating].push(problem)
        else
            ratingDict[problem.rating] = [problem]
    })
    return ratingDict
}

const tagsDictBuilder = (problemList : any) : any => {
    let tagDict : any = {}
    problemList.forEach((problem : any)=>{
        problem.tags.forEach((tag : string)=>{
            if(tagDict[tag])
                tagDict[tag].push(problem)
            else
                tagDict[tag] = [problem]
        })
    })
    return tagDict
}

export {ratingDictBuilder, tagsDictBuilder}