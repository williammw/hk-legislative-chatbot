# Hong Kong Legislative Chatbot

The 'hk-legislative-chatbot' is an AI-powered chatbot designed to provide information about the Legislative Council of the Hong Kong Special Administrative Region. The chatbot is knowledgeable and can communicate in both English and Chinese.
# DEMO 
https://hk-legislative-chatbot.vercel.app/
## Technical Specifications

- **Base Model**: GPT-4 (text-davinci-003)
- **Languages Supported**: English and Chinese
- **Backend**: Node.js
- **Frontend**: React

## API Integration

The chatbot uses the following API to fetch the latest LegCo member data:

```https://app4.legco.gov.hk/mapi/tc/api/LASS/getListMember```


## Fine-Tuning the Model

To improve the chatbot's performance and domain-specific knowledge, we fine-tune the base GPT-4 model with custom training data.

### Fine-Tuning Example

1. Prepare a dataset containing questions and answers in both English and Chinese, formatted as a JSONL file. Each line should be a JSON object containing a 'prompt' and 'completion' field:

```json
{"prompt": "香港特別行政區立法會現任議員姓名?", "completion": "The current members of the Legislative Council of the Hong Kong Special Administrative Region include: 梁君彥議員, 張宇人議員, 林健鋒議員, 李慧琼議員, 陳克勤議員, 陳健波議員, 梁美芬議員, 葉劉淑儀議員, 謝偉俊議員, 田北辰議員, 何俊賢議員, 易志明議員, 馬逢國議員, 陳恒鑌議員, 郭偉强議員, 葛珮帆議員, 廖長江議員, 盧偉國議員, 吳永嘉議員, 何君堯議員, 周浩鼎議員, 邵家輝議員, 容海恩議員, 陳振英議員, 陸頌雄議員, 劉國勳議員, 劉業強議員, 鄭泳舜議員, 謝偉銓議員, 江玉歡議員, 朱國強議員, 李世榮議員, 李浩然議員, 李惟宏議員, 李梓敬議員, 李鎮強議員, 狄志遠議員, 吳秋北議員, 吳傑莊議員, 周小松議員, 周文港議員, 林哲玄議員, 林振昇議員, 林素蔚議員, 林琳議員, 林順潮議員, 林新強議員, 林筱魯議員, 邱達根議員, 姚柏良議員, 洪雯議員, 梁子穎議員, 梁文廣議員, 梁熙議員, 梁毓偉議員, 陳月明議員, 陳仲尼議員, 陳沛良議員, 陳勇議員, 陳祖恒議員, 陳家珮議員, 陳曼琪議員, 陳紹雄議員, 陳凱欣議員, 陳穎欣議員, 陳學鋒議員, 張欣宇議員, 郭玲麗議員, 陸瀚民議員, 黃英豪議員, 黃俊碩議員, 黃國議員, 楊永杰議員, 管浩鳴議員, 鄧飛議員, 鄧家彪議員, 黎棟國議員, 劉智鵬議員, 霍啟剛議員, 龍漢標議員, 顏汶羽議員, 簡慧敏議員, 譚岳衡議員, 蘇長荣議員, 嚴剛議員, 何敬康議員, 尚海龍議員, 陳永光議員, 黃錦輝議員"}
```

2. Save the dataset as a .jsonl file, for example, training_data.jsonl.
3. Upload the dataset and start the fine-tuning job using the OpenAI CLI:
  
```
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> -m <BASE_MODEL>
```

Replace <TRAIN_FILE_ID_OR_PATH> with the path to your training_data.jsonl file and <BASE_MODEL> with the name of the base model you're starting from, such as text-davinci-003.

4. Monitor the fine-tuning process and wait for the job to complete. This might take minutes or hours, depending on the dataset size and the job queue.

5. Once the fine-tuned model is ready, integrate it into your chatbot application by updating the model parameter in your API calls.

Please ensure you follow the OpenAI fine-tuning guide and the API documentation for detailed instructions on how to fine-tune and use your custom model.

# Usage
After setting up the 'hk-legislative-chatbot' and fine-tuning the GPT-4 model, users can interact with the chatbot to get information about the Hong Kong Legislative Council. The chatbot can answer questions related to LegCo members, their roles, and other related information in both English and Chinese.

# Contributing
We welcome contributions to improve the 'hk-legislative-chatbot' project. To contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your changes.
3. Make your changes in your new branch.
4. Submit a pull request to merge your changes into the main branch.
  
Please ensure that your changes adhere to the project's coding standards and guidelines. We will review your pull request and provide feedback before merging it into the main branch.

