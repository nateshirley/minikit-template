import SendTxTest from "@/components/SendTxTest";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
      {/* <SignIn />
      <VerifyBlock />
      <PayBlock /> */}
      <SendTxTest />
    </main>
  );
}
