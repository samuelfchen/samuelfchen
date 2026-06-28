export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-6">
      <div className="mx-auto flex max-w-xl items-center justify-between px-6 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Sam Chen</p>
      </div>
    </footer>
  );
}
