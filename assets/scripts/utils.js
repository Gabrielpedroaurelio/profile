async function GetDatas(url) {
    try {

        const request = await fetch(url,
           /* {
                headers: 'application/json',
                method: 'GET'

            }*/)
        if (!request.ok) throw new Error("Erro na requisição")
        const response = await request.json()

        return response
    } catch (error) {
        console.error("Erro na função \n" + error);

    }
}
export { GetDatas }