
import GithubProvider, { GithubProfile } from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import User from "../db/models/userSchema"
import connectDB from "../db/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      async profile(profile: GithubProfile, token: any) {
        await connectDB();
        // Does user exist
        const yes: any = await User.findOne({ email: profile.email });
        console.log('yes', yes);
        
        if (!yes) {

          try {
            const newUser: any = new User({ 
              name: profile.name,
              email: profile.email,
            });
            await newUser.save();
            return {
              id: "newUser._id.toString()",
              name: profile.name,
              email: profile.email,
            };
          } catch (error) {
            console.log('GitHub auth error while adding user:');
            return {
              id: '',
            };
          }

        }else{
          return {
            id: yes._id.toString(),
            name: profile.name,
            email: profile.email,
          }
        }


      }
    }),
  ],
}