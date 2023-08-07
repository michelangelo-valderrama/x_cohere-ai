const COHERE_API_KEY = 'zvIqry4GfllHNZEO56Clq3bCRYyTt2E830GwmGgR';
const COHERE_API_URL = 'https://api.cohere.ai/v1/generate';

/* 
curl --location --request POST 'https://api.cohere.ai/v1/generate' \
  --header 'Authorization: BEARER zvIqry4GfllHNZEO56Clq3bCRYyTt2E830GwmGgR' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "model": "command",
      "prompt": "This is a spell check generator. \n--\nIncorrect sample: \"I are good!\"\nCorrect sample: \"I am good!\"\n--\nIncorrect sample: \"I have 22 years old\"\nCorrect sample: \"I am 22 years old\"\n--\nIncorrect sample: \"I don'"'"'t can know\"\nCorrect sample: \"I don'"'"'t know\"\n---\nIncorrect sample: \"I are bad\"\nCorrect sample:",
      "max_tokens": 300,
      "temperature": 0.9,
      "k": 0,
      "stop_sequences": [],
      "return_likelihoods": "NONE"
    }'
*/

export async function fixMyEnglish(input) {
    const data = {
        model: 'xlarge',
        prompt: `This is a spell check generator. 
--
Incorrect sample: "I are good!"
Correct sample: "I am good!"
--
Incorrect sample: "I have 22 years old"
Correct sample: "I am 22 years old"
--
Incorrect sample: "I don't can know"
Correct sample: "I don't know"
--
Incorrect sample: "${input}"
Correct sample:`,
        max_tokens: 40,
        temperature: 0.3,
        k: 0,
        p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: ['--'],
        return_likelihoods: 'NONE'
    }

    const response = await fetch(COHERE_API_URL, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${COHERE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).catch(error => console.log(error))
    const { text } = response.generations[0];
    return text.split('"')[1]
}
