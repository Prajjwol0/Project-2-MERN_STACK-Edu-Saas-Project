import bcrypt from "bcrypt";

const randomPasswordGenerator = (teacherName: string) => {
    const randomNumber = Math.floor(1000 + Math.random() * 90000);
    const plainVersion = `${randomNumber}_${teacherName}`;
    const hashedVersion = bcrypt.hashSync(plainVersion, 10);

    return {
        plainVersion,
        hashedVersion
    };
};

export default randomPasswordGenerator;
