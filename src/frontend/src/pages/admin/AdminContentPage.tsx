import { Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Textarea } from "../../components/ui/textarea";
import {
  useSiteContent,
  useUpdateContactInfo,
  useUpdateFAQs,
  useUpdateHeroSection,
  useUpdateServices,
  useUpdateTestimonials,
} from "../../hooks/useSiteContent";
import type { FAQ, ServiceCard, Testimonial } from "../../types";

function HeroTab() {
  const { data: content, isLoading } = useSiteContent();
  const updateHero = useUpdateHeroSection();
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [intro, setIntro] = useState("");
  const [ctaText, setCtaText] = useState("");

  useEffect(() => {
    if (content) {
      setTitle(content.heroTitle);
      setTagline(content.heroTagline);
      setIntro(content.heroIntro);
      setCtaText(content.heroCtaText);
    }
  }, [content]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateHero.mutateAsync({
        heroTitle: title,
        heroTagline: tagline,
        heroIntro: intro,
        heroCtaText: ctaText,
      });
      toast.success("Hero section saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  if (isLoading) return <Skeleton className="h-64 w-full" />;

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-xl">
      {[
        { id: "heroTitle", label: "Title", value: title, set: setTitle },
        {
          id: "heroTagline",
          label: "Tagline",
          value: tagline,
          set: setTagline,
        },
        {
          id: "heroCta",
          label: "CTA Button Text",
          value: ctaText,
          set: setCtaText,
        },
      ].map(({ id, label, value, set }) => (
        <div key={id} className="space-y-1">
          <Label htmlFor={id}>{label}</Label>
          <Input
            id={id}
            value={value}
            onChange={(e) => set(e.target.value)}
            className="bg-background"
            data-ocid={`${id}-input`}
          />
        </div>
      ))}
      <div className="space-y-1">
        <Label htmlFor="heroIntro">Introduction</Label>
        <Textarea
          id="heroIntro"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          rows={3}
          className="bg-background resize-none"
        />
      </div>
      <Button
        type="submit"
        disabled={updateHero.isPending}
        className="bg-accent text-accent-foreground hover:bg-accent/90"
        data-ocid="hero-save-btn"
      >
        <Save className="w-4 h-4 mr-2" />
        {updateHero.isPending ? "Saving…" : "Save Hero"}
      </Button>
    </form>
  );
}

function ServicesTab() {
  const { data: content, isLoading } = useSiteContent();
  const updateServices = useUpdateServices();
  const [services, setServices] = useState<ServiceCard[]>([]);

  useEffect(() => {
    if (content) setServices(content.services);
  }, [content]);

  const add = () =>
    setServices([
      ...services,
      {
        id: BigInt(Date.now()),
        title: "",
        description: "",
        icon: "stethoscope",
        order: BigInt(services.length),
      },
    ]);
  const remove = (i: number) =>
    setServices(services.filter((_, idx) => idx !== i));
  const update = (i: number, field: string, value: string) => {
    const next = [...services] as ServiceCard[];
    next[i] = { ...next[i], [field]: value } as ServiceCard;
    setServices(next);
  };

  const handleSave = async () => {
    try {
      await updateServices.mutateAsync(services);
      toast.success("Services saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  if (isLoading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-4">
      <div className="space-y-3 max-w-2xl">
        {services.map((s, i) => (
          <Card key={s.id.toString()} className="bg-muted/30 border-border">
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Title</Label>
                  <Input
                    value={s.title}
                    onChange={(e) => update(i, "title", e.target.value)}
                    className="bg-background h-8 text-sm"
                    data-ocid={`service-title-${i}`}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Icon</Label>
                  <Input
                    value={s.icon}
                    onChange={(e) => update(i, "icon", e.target.value)}
                    className="bg-background h-8 text-sm"
                    placeholder="e.g. stethoscope"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Description</Label>
                <Textarea
                  value={s.description}
                  onChange={(e) => update(i, "description", e.target.value)}
                  rows={2}
                  className="bg-background text-sm resize-none"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive h-7 text-xs"
                onClick={() => remove(i)}
              >
                <Trash2 className="w-3 h-3 mr-1" /> Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={add}
          data-ocid="add-service-btn"
        >
          <Plus className="w-3 h-3 mr-1" /> Add Service
        </Button>
        <Button
          onClick={handleSave}
          disabled={updateServices.isPending}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          data-ocid="services-save-btn"
        >
          <Save className="w-4 h-4 mr-2" />
          {updateServices.isPending ? "Saving…" : "Save Services"}
        </Button>
      </div>
    </div>
  );
}

function TestimonialsTab() {
  const { data: content, isLoading } = useSiteContent();
  const updateTestimonials = useUpdateTestimonials();
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (content) setItems(content.testimonials);
  }, [content]);

  const add = () =>
    setItems([
      ...items,
      {
        id: BigInt(Date.now()),
        name: "",
        role: "",
        text: "",
        rating: BigInt(5),
      },
    ]);
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const update = (i: number, field: string, value: string) => {
    const next = [...items];
    next[i] =
      field === "rating"
        ? { ...next[i], rating: BigInt(Number(value)) }
        : { ...next[i], [field]: value };
    setItems(next);
  };

  const handleSave = async () => {
    try {
      await updateTestimonials.mutateAsync(items);
      toast.success("Testimonials saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  if (isLoading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-4">
      <div className="space-y-3 max-w-2xl">
        {items.map((t, i) => (
          <Card key={t.id.toString()} className="bg-muted/30 border-border">
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Name</Label>
                  <Input
                    value={t.name}
                    onChange={(e) => update(i, "name", e.target.value)}
                    className="bg-background h-8 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Role</Label>
                  <Input
                    value={t.role}
                    onChange={(e) => update(i, "role", e.target.value)}
                    className="bg-background h-8 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Text</Label>
                <Textarea
                  value={t.text}
                  onChange={(e) => update(i, "text", e.target.value)}
                  rows={2}
                  className="bg-background text-sm resize-none"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Rating (1-5)</Label>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={t.rating.toString()}
                  onChange={(e) => update(i, "rating", e.target.value)}
                  className="bg-background h-8 text-sm w-20"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive h-7 text-xs"
                onClick={() => remove(i)}
              >
                <Trash2 className="w-3 h-3 mr-1" /> Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={add}>
          <Plus className="w-3 h-3 mr-1" /> Add
        </Button>
        <Button
          onClick={handleSave}
          disabled={updateTestimonials.isPending}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          data-ocid="testimonials-save-btn"
        >
          <Save className="w-4 h-4 mr-2" />
          {updateTestimonials.isPending ? "Saving…" : "Save Testimonials"}
        </Button>
      </div>
    </div>
  );
}

function FAQTab() {
  const { data: content, isLoading } = useSiteContent();
  const updateFAQs = useUpdateFAQs();
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    if (content) setFaqs(content.faqs);
  }, [content]);

  const add = () =>
    setFaqs([
      ...faqs,
      {
        id: BigInt(Date.now()),
        question: "",
        answer: "",
        order: BigInt(faqs.length),
      },
    ]);
  const remove = (i: number) => setFaqs(faqs.filter((_, idx) => idx !== i));
  const update = (i: number, field: "question" | "answer", value: string) => {
    const next = [...faqs];
    next[i] = { ...next[i], [field]: value };
    setFaqs(next);
  };

  const handleSave = async () => {
    try {
      await updateFAQs.mutateAsync(faqs);
      toast.success("FAQs saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  if (isLoading) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-4">
      <div className="space-y-3 max-w-2xl">
        {faqs.map((f, i) => (
          <Card key={f.id.toString()} className="bg-muted/30 border-border">
            <CardContent className="p-4 space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Question</Label>
                <Input
                  value={f.question}
                  onChange={(e) => update(i, "question", e.target.value)}
                  className="bg-background h-8 text-sm"
                  data-ocid={`faq-q-${i}`}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Answer</Label>
                <Textarea
                  value={f.answer}
                  onChange={(e) => update(i, "answer", e.target.value)}
                  rows={3}
                  className="bg-background text-sm resize-none"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive h-7 text-xs"
                onClick={() => remove(i)}
              >
                <Trash2 className="w-3 h-3 mr-1" /> Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={add}>
          <Plus className="w-3 h-3 mr-1" /> Add FAQ
        </Button>
        <Button
          onClick={handleSave}
          disabled={updateFAQs.isPending}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          data-ocid="faq-save-btn"
        >
          <Save className="w-4 h-4 mr-2" />
          {updateFAQs.isPending ? "Saving…" : "Save FAQs"}
        </Button>
      </div>
    </div>
  );
}

function ContactTab() {
  const { data: content, isLoading } = useSiteContent();
  const updateContact = useUpdateContactInfo();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hours, setHours] = useState("");
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    if (content) {
      setAddress(content.contactInfo.address);
      setPhone(content.contactInfo.phone);
      setEmail(content.contactInfo.email);
      setHours(content.contactInfo.hours);
      setMapUrl(content.contactInfo.mapUrl);
    }
  }, [content]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateContact.mutateAsync({ address, phone, email, hours, mapUrl });
      toast.success("Contact info saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  if (isLoading) return <Skeleton className="h-64 w-full" />;

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-xl">
      {[
        { id: "address", label: "Address", value: address, set: setAddress },
        { id: "cPhone", label: "Phone", value: phone, set: setPhone },
        { id: "cEmail", label: "Email", value: email, set: setEmail },
        { id: "hours", label: "Hours", value: hours, set: setHours },
        { id: "mapUrl", label: "Map Embed URL", value: mapUrl, set: setMapUrl },
      ].map(({ id, label, value, set }) => (
        <div key={id} className="space-y-1">
          <Label htmlFor={id}>{label}</Label>
          <Input
            id={id}
            value={value}
            onChange={(e) => set(e.target.value)}
            className="bg-background"
            data-ocid={`contact-${id}-input`}
          />
        </div>
      ))}
      <Button
        type="submit"
        disabled={updateContact.isPending}
        className="bg-accent text-accent-foreground hover:bg-accent/90"
        data-ocid="contact-save-btn"
      >
        <Save className="w-4 h-4 mr-2" />
        {updateContact.isPending ? "Saving…" : "Save Contact Info"}
      </Button>
    </form>
  );
}

export default function AdminContentPage() {
  return (
    <div className="space-y-5" data-ocid="admin-content">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Site Content
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Edit all website sections without code changes
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <Tabs defaultValue="hero">
            <TabsList
              className="bg-muted/40 mb-6 flex-wrap h-auto gap-1"
              data-ocid="content-tabs"
            >
              {["hero", "services", "testimonials", "faq", "contact"].map(
                (tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="capitalize data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                    data-ocid={`content-tab-${tab}`}
                  >
                    {tab === "faq"
                      ? "FAQ"
                      : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ),
              )}
            </TabsList>
            <TabsContent value="hero">
              <HeroTab />
            </TabsContent>
            <TabsContent value="services">
              <ServicesTab />
            </TabsContent>
            <TabsContent value="testimonials">
              <TestimonialsTab />
            </TabsContent>
            <TabsContent value="faq">
              <FAQTab />
            </TabsContent>
            <TabsContent value="contact">
              <ContactTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
