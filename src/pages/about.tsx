import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import BouncingMarkers from '@site/src/components/BouncingMarkers';
import styles from './about.module.css';

const team = [
  {name: 'Hannes Rüger', photo: 'hannes', href: 'https://rueger.events/'},
  {name: 'Laurenz Jaensch', photo: 'laurenz', href: 'https://www.instagram.com/laurenz_jaensch/'},
];

const professors = ['Prof. Dr. Simon Wiest', 'Prof. Dr. Jan Froehlich'];
const supporters = ['Dipl.-Ing. Robin Schulte', 'Peter Ruhrmann'];

function Person({name, photo, href}: (typeof team)[number]): ReactNode {
  const src = useBaseUrl(`/img/team/${photo}.webp`);
  return (
    <a href={href} target="_blank" rel="noopener" className={styles.person}>
      {/* clips the zoomed photo, so it grows inside its frame */}
      <div className={styles.photo}>
        <img src={src} alt={name} width={600} height={600} />
      </div>
      <span className={styles.name}>{name}</span>
    </a>
  );
}

export default function About(): ReactNode {
  return (
    <Layout
      title="About us"
      description="PostPin is made by Hannes and Laurenz, two students of Audiovisual Media at Stuttgart Media University."
    >
      <BouncingMarkers />
      <main className={styles.page}>
        <h1>About us</h1>

        {/* hovering one of us dims the other */}
        <div className={styles.team}>
          {team.map((person) => (
            <Person key={person.name} {...person} />
          ))}
        </div>

        <div className={styles.text}>
          <p>
            We are Hannes and Laurenz, two students of Audiovisual Media at Stuttgart Media
            University (Hochschule der Medien).
          </p>
          <p>
            Hannes has a strong passion for software development, while Laurenz is particularly
            interested in post-production. But in reality, we both share a love for both worlds:
            technology and creative processes.
          </p>
          <p>
            The idea for PostPin was born as part of a university project. Our goal was to bring
            some order to the often chaotic world of post-production. We want to meet the complex
            demands of professional post-production workflows while keeping things simple and
            intuitive. After all, everyone involved should be able to take part in the review
            process without unnecessary complications.
          </p>
          <p>
            What started as an experiment and an opportunity to learn, explore and build something
            of our own has grown into a project we are genuinely proud of.
          </p>
        </div>

        <section className={styles.thanks}>
          <h2>Thank you</h2>
          <p>We would like to thank everyone who supported us along the way, especially</p>
          <ul className={styles.professors}>
            {professors.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <p>and</p>
          <ul className={styles.supporters}>
            {supporters.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  );
}
