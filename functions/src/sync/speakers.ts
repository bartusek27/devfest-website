import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const changedSpeakers = functions.firestore.document('speakers/{speakerId}').onWrite(() => {
  return updateOrCreateSpeaker();
});

async function updateOrCreateSpeaker() {
  const allSpeakersFirestore = await admin.firestore().collection('speakers').get();
  const pushArray = [];
  for (const speakerFireDoc of allSpeakersFirestore.docs){
    try {
      const speaker = {};
      const speakerFire = speakerFireDoc.data();
      speaker["bio"] = speakerFire.about;
      const companyArray = speakerFire.companies[0].split("/");
      speaker["company"] = speakerFire.company ? speakerFire.company : companyArray[companyArray.length-1].slice(0,-4);
      speaker["companyLogo"] = speakerFire.companies[0];
      speaker["cardPosition"] = speakerFire.cardPosition ? speakerFire.cardPosition : 0;
      speaker["featured"] = speakerFire.show;
      speaker["id"] = pushArray.length;
      speaker["customId"] = speakerFireDoc.id;
      speaker["name"] = speakerFire.name;
      speaker["photoUrl"] = speakerFire.photo;
      speaker["shortBio"] = speakerFire.about.substring(0,80) + "...";
      speaker["socials"] = [];
      if (speakerFire.twitter){
        speaker["socials"][0] = {icon: "twitter", link: ("https://twitter.com/" + speakerFire['twitter']), name: "Twitter"};
      }
      speaker["tags"] = [];
      speaker["title"] = speakerFire.job;
      pushArray.push(speaker);
    } catch (e){
    }
  }
  pushArray.sort((a,b)=> a.cardPosition - b.cardPosition);
  return admin.database().ref('speakers').set(pushArray);
}