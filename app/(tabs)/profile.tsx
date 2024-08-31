import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { P } from "~/components/ui/typography";

export default function MoviesScreen() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Movies</CardTitle>
      </CardHeader>
      <CardContent>
        <P>Here you can see all the movies you have watched.</P>
      </CardContent>
    </Card>
  );
}
